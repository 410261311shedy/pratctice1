//this file is a list for all potential errors

//using classes to keep our error types organized
//in creating base class so that we can extend on other classes

//just a regular js class write in the class methods not like a js function one, but can be
//base request error
export class RequestError extends Error {
   statusCode: number;
   errors?: Record<string, string[]>;

   //what are we accepting into this class
   constructor(
      statusCode: number,
      message: string,
      errors?: Record<string, string[]>
   ) {
      //super calls the parent class and passes the error message
      //like this will pass to the Error class
      //this inirializes the base functionality and sets the message property on the error instance
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.name = "RequestError";
   }
}

export class ValidationError extends RequestError {
   constructor(fieldErrors: Record<string, string[]>) {
      const message = ValidationError.formatFieldErrors(fieldErrors);
      //pass things into it status code, message and fieldErrors
      super(400, message, fieldErrors);
      this.name = "ValidationError";
      this.errors = fieldErrors;
   }
   // to access the formatMessage on the validation error
   //declare it as below
   // and it'll return a string (:string)
   static formatFieldErrors(errors: Record<string, string[]>): string {
      const formattedMessages = Object.entries(errors).map(
         ([field, messages]) => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

            if (messages[0] === "Required") {
               return `${fieldName} is required`;
            } else {
               return messages.join(" and ");
            }
         }
      );
      return formattedMessages.join(", ");
   }
}

export class NotFoundError extends RequestError {
   constructor(resource: string) {
      super(404, `${resource} not found`);
      this.name = "NotFoundError";
   }
}

export class ForbiddenError extends RequestError {
   constructor(message: string = "Forbidden") {
      super(403, message);
      this.name = "ForbiddenError";
   }
}

export class UnauthorizedError extends RequestError {
   constructor(message: string = "unauthorized") {
      super(401, message);
      this.name = "UnauthorizedError";
   }
}
