class CustomErrorHandler extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    (this.status = status), (this.message = message);
  }

  static alreadyExist(message: string) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message: string = "username and password are wrong") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message: string = "404 User Not Found") {
    return new CustomErrorHandler(404, message);
  }

  static unAuthorized(message: string = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }

  static serverError(message: string = "Internal Server Error") {
    return new CustomErrorHandler(505, message);
  }
}

export default CustomErrorHandler;
