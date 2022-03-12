// Firebase Errors

export type SignInErrorObject = {
  type: string;
  message: string;
};

export type FirebaseErrorType = {
  email: null | SignInErrorObject;
  password: null | SignInErrorObject;
};
