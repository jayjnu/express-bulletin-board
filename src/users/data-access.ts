import { DelegatedQueryMethod } from '../mysql-middleware/interfaces';

export interface RequiredUserInfo {
  userId: string;
  firstName: string;
  lastName: string;
  userPass: string;
  email: string;
}

export interface UserDataSchema extends RequiredUserInfo {
}

export class DataAccess {
  query: DelegatedQueryMethod;

  constructor(query: DelegatedQueryMethod) {
    this.query = query;
  }

  getUsers({limit = 50}: { limit: number }) {
    const query = `SELECT * from users LIMIT ${limit}`;
    return this.query(query);
  }

  async getUserByUserId(userId: string | number) {
    const query = `SELECT * FROM users WHERE user_id='${userId}'`;
    return await this.query(query);
  }

  async updateUserData({userId, firstName, lastName, userPass, email}: RequiredUserInfo) {
    const dataBeforeUpdate = await this.getUserByUserId(userId);
    const newData = Object.assign({}, dataBeforeUpdate, {
      userPass,
      email
    });
    const query = `
      UPDATE users
      SET user_pass=${newData.userPass} email=${newData.email}
      WHERE user_id=${userId}
    `;
    return await this.query(query);
  }

  async registerUser(userData: UserDataSchema) {
    const query = `
      INSERT INTO users (user_id, first_name, last_name, password, email)
      VALUES ('${userData.userId}', '${userData.firstName}', '${userData.lastName}', '${userData.userPass}', '${userData.email}')
    `;
    return await this.query(query);
  }
}