export type ResponseErrorType = {
  name: string;
  message: string;
  status: boolean;
};

export type ResponseSuccessType = {
  data?: object;
  message: string;
  status: boolean;
};
