class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
  // this will be called by res.json automatically.
  toJSON() {
    return {
      error: true,
      message: this.message,
      name: this.name,
    };
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "VALIDATION_ERROR";
  }
}

export class CredentialsError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "CREDENTIALS_ERROR";
  }
}

export class JWTTokenError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "JWT_TOKEN_ERROR";
  }
}

export class AccountCreationError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "ACCOUNT_CREATION_ERROR";
  }
}

export class UserNotFound extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "USER_NOT_FOUND";
  }
}

export class ProductNotFound extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "PRODUCT_NOT_FOUND";
  }
}

export class OrderNotFound extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "Order_NOT_FOUND";
  }
}

export class OrderProductExists extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "ORDER_PROUDCT_ALREADY_EXISTS";
  }
}
