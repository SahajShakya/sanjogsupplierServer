import { Request, Response } from 'express';
import { AddUserTypes } from '../types/UserTypes';
import { addPaging } from '../utils/AddPaging';
import { normalizeResp } from '../utils/NormalizeResp';
import { normalizeErr } from '../utils/NormalizeErrRes';
import { Users } from '../models/users';
import { UsersValidator } from '../validators/UsersValidator';
import { NotFoundError, ValidationError } from '../errors/error';
import { UserDetails } from '../models/userdetails';
import { hash, randomTokenString } from '../utils/AuthUtils';
import Email from '../libs/email/email';


export const getUsers = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page.toString()) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : Number.MAX_SAFE_INTEGER;
  try {
    const response = await Users.findAndCountAll({
      attributes: {
        exclude: ['password', 'verificationToken', 'verified']
      },
      limit: limit,
      offset: page * limit,
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
      ],

    });
    const finalResp = response && addPaging(response, page, limit);
    normalizeResp({ data: finalResp, responseType: 'get', res });
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: 'internal', res });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { userName, email, password, userTypeId, isActive, firstName, lastName, coachId, classId, advancedSettings } = req.body;

  try {
    const { error } = UsersValidator.addUsers(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message)
    } else {

      const oldUser = await Users.findOne({
        where: { email: email },
      });
      if (oldUser) {
        throw new ValidationError("Email already existed")
      }

      const user = await Users.create({
        userName: `${firstName}${Math.floor(1000 + Math.random() * 9000)}`,
        email, password, userTypeId, isActive, hasAdvancedSettings: advancedSettings =='1'? true: false,
        verified: false,
        verificationToken: null
      });

      // hash password
      user.verificationToken = randomTokenString();
      user.password = hash(password);

      // save account
      user.save();

      // create details
      const userDetails = await UserDetails.create({
        userId: user.id, firstName, lastName
      })

      // create assigned class


      const url = `${process.env.HOST_URL}/login`;
      await new Email({ email, firstName, lastName, password }, url).sendUserCreate()
      normalizeResp({ data: user, responseType: 'post', res });
    }
  } catch (error: any) {
    console.log("error ", error)
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userName, email, password, userTypeId, isActive, firstName, lastName, coachId, classId, advancedSettings } = req.body;

  try {
    const { error } = UsersValidator.updateUsers(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message)
    } else {
      const user = await Users.update({
        email, userTypeId, isActive, hasAdvancedSettings: advancedSettings =='1'? true: false
      }, {
        where: {
          id: id,
        },
      });

      if(password){
        const user = await Users.findByPk(id)
        if(user){
          user.password =  hash(password)
          user.save()
        }
      }

      // updating rest
      // create details
      const userDetails = await UserDetails.update({ firstName, lastName }, {
        where: {
          userId: id,
        },
      });


      if (user[0] === 1) {
        const finalResp = user && (await Users.findByPk(id));
        if (finalResp) {
          normalizeResp({ data: finalResp, responseType: 'put', res });
        } else {
          throw new NotFoundError("User not found")
        }

      } else {
        throw new NotFoundError("User not found")
      }
    }
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await Users.findByPk(id, {
      attributes: {
        exclude: ['password', 'verificationToken', 'verified']
      }
    });
    if (!response) {
      throw new NotFoundError('User  with given id not found')
    } else {
      normalizeResp({ data: response, responseType: 'get', res });
    }
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await Users.destroy({
      where: {
        id: id,
      },
    });
    if (response === 0) {
      throw new NotFoundError('User with given id not found')
    } else {
      normalizeResp({
        data: 'User  with id id deleted successfully!',
        responseType: 'delete',
        res,
      });
    }
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};


