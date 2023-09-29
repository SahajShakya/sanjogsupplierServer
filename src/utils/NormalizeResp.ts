import { Response } from 'express';
interface IResp<T> {
  data: T;
  responseType: 'post' | 'get' | 'put' | 'delete';
  res: Response;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const normalizeResp = (args: IResp<[] | {}>) => {
  const { data = [], responseType, res } = args;
  if (responseType === 'post') {
    res.status(201).json({
      status: 201,
      result: data,
      message: 'Successfully created',
    });
  } else if (responseType === 'get') {
    res.status(200).json({
      status: 200,
      result: data,
      message: 'Successfully fetched',
    });
  } else if (responseType === 'put') {
    res.status(200).json({
      status: 200,
      result: data,
      message: 'Successfully updated',
    });
  } else if (responseType === 'delete') {
    res.status(200).json({
      status: 200,
      result: data,
      message: 'Successfully deleted',
    });
  }
};
