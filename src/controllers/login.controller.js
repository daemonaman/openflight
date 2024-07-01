const statusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const loginService = require("../services/service");
const mongoose = require("mongoose");
const addAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await loginService.addAdmin(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      "Register Successfully",
      "Register Successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: statusCode.DATA_ALREADY_EXISTS,
          message: error.errmsg,
          displayMessage: `${error.keyValue[Object.keys(error.keyValue)[0]]} already exists`,
        },
        res
      );
    }
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const addUser = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await loginService.addUser(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      "Register Successfully",
      "Register Successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: statusCode.DATA_ALREADY_EXISTS,
          message: error.errmsg,
          displayMessage: `${error.keyValue[Object.keys(error.keyValue)[0]]} already exists`,
        },
        res
      );
    }
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const login = async (req, res) => {
  try {
    const result = await loginService.login(req.body);
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      "Login Successfully",
      "Login Successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const updateUser = async (req, res) => {
  try {
    const role = req.role;
    const result = await loginService.updateUser(req.userName, role, req.body);
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      `${role} updated successfully`,
      `${role} updated successfully`
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const forgotPassword = async (req, res) => {
  try {
    const result = await loginService.forgotPassword(req.body);
    return response.handleSuccessResponse(
      result,
      res,
      "Reset link sent successfully",
      "Reset link sent successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const userPasswordReset = async (req, res) => {
  try {
    const result = await loginService.userPasswordReset(req.params, req.body);
    return response.handleSuccessResponse(
      result,
      res,
      "Password changed successfully",
      "Password changed successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};

module.exports = {
  /**
   * @swagger
   * tags:
   *   name: User services
   *   description: User service APIs
   *
   * /add-admin:
   *   post:
   *     summary: Add a new admin
   *     description: Use this API to add a new admin user
   *     tags:
   *       - User Services
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: admin
   *         description: The admin object to add
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: The name of the admin
   *               example: simanchala
   *             number:
   *               type: string
   *               description: The contact number of the admin
   *               example: 1236549871
   *             email:
   *               type: string
   *               format: email
   *               description: The email address of the admin
   *               example: simanchala@gmail.com
   *             password:
   *               type: string
   *               description: The password of the admin
   *               example: password
   *     responses:
   *       200:
   *         description: Successful response indicating the addition of the admin
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal server error
   */
  addAdmin,
  /**
   * @swagger
   * tags:
   *   name: User services
   *   description: User service APIs
   *
   * /add-user:
   *   post:
   *     summary: Add a new user
   *     description: Use this API to add a new user user
   *     tags:
   *       - User Services
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: user
   *         description: The user object to add
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: The name of the user
   *               example: jintu
   *             number:
   *               type: string
   *               description: The contact number of the user
   *               example: 9876543219
   *             email:
   *               type: string
   *               format: email
   *               description: The email address of the user
   *               example: jintu@gmail.com
   *             password:
   *               type: string
   *               description: The password of the admin
   *               example: password
   *             role:
   *               type: string
   *               enum: ["user", "builder", "agent"]
   *               default: "user"
   *               description: The role of the user
   *     responses:
   *       200:
   *         description: Successful response indicating the addition of the admin
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal server error
   */
  addUser,
  /**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: User authentication APIs
   *
   * /login:
   *   post:
   *     summary: User login
   *     description: Use this API to authenticate a user
   *     tags:
   *       - Authentication
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: credentials
   *         description: The user credentials for login
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             username:
   *               type: string
   *               format: email
   *               description: The username or email address of the user
   *               example: Your Gmail
   *             password:
   *               type: string
   *               description: The password of the user
   *               example: password
   *     responses:
   *       200:
   *         description: Successful response indicating successful login
   *       401:
   *         description: Unauthorized - Invalid credentials
   *       500:
   *         description: Internal server error
   */
  login,
  /**
   * @swagger
   * tags:
   *   - name: Login Services
   *     description: APIs for venodr login Management
   *
   * /forgot-password:
   *   post:
   *     summary: Forgot Password
   *     description: Use this API to initiate the password reset process
   *     tags:
   *       - Login Services
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: email
   *         description: The email of the user
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *               description: The email of the user
   *               example: john@gmail.com
   *     responses:
   *       200:
   *         description: Successful response indicating that the password reset process has been initiated
   *       400:
   *         description: Bad request - Missing or invalid parameters
   *       401:
   *         description: Unauthorized - Invalid credentials
   *       500:
   *         description: Internal server error
   */
  forgotPassword, 
  /**
   * @swagger
   * tags:
   *   - name: Login Services
   *     description: APIs for vendor login Management
   *
   * /password-reset/{token}:
   *   post:
   *     summary: Update Password
   *     description: Use this API to update the password using a reset token
   *     tags:
   *       - Login Services
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: token
   *         description: The reset token received via email
   *         required: true
   *         schema:
   *           type: string
   *           example: "resetToken123"
   *       - in: body
   *         name: passwordData
   *         description: The new password and confirm password
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             password:
   *               type: string
   *               description: The new password
   *               example: new1234
   *             confirmPassword:
   *               type: string
   *               description: The confirm password
   *               example: new1234
   *     responses:
   *       200:
   *         description: Successful response indicating successful password update
   *       400:
   *         description: Bad request - Missing or invalid parameters
   *       401:
   *         description: Unauthorized - Invalid or expired token
   *       440:
   *         description: Session Expired - session expired
   *       500:
   *         description: Internal server error
   */
  userPasswordReset,
  /**
   * @swagger
   * /update-user:
   *   put:
   *     summary: Update user information
   *     description: Use this API to update user details
   *     tags:
   *       - Profile management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         type: string
   *         required: true
   *         schema:
   *           type: string
   *           format: token
   *           example: user login token
   *       - in: body
   *         name: body
   *         description: The fields to update
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: The name of the user
   *               example: John Doe
   *             number:
   *               type: string
   *               description: The phone number of the user
   *               example: '+1234567890'
   *             email:
   *               type: string
   *               format: email
   *               description: The email address of the user
   *               example: user@example.com
   *             location:
   *               type: string
   *               description: The location of the user
   *               example: 'New York, USA'
   *             address:
   *               type: string
   *               description: The address of the user
   *               example: '123 Main St, New York, NY 10001'
   *             profile:
   *               type: string
   *               description: The profile description or URL of the user
   *               example: 'Profile description or URL'
   *     responses:
   *       200:
   *         description: Successful response indicating user details were updated
   *       400:
   *         description: Bad request - Invalid input data
   *       404:
   *         description: Not found - User not found
   *       500:
   *         description: Internal server error
   */
  updateUser,
};
