import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Iperson } from '../interfaces/iperson';

const DB_USERS = 'muuserdb';

@Injectable({
  providedIn: 'root'
})
export class SqLiteService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db !: SQLiteDBConnection
  private persons !: Iperson[]
  constructor() { }

  async initDB() {
    try {
      await this.sqlite.checkConnectionsConsistency();
    } catch (err) {
      console.error('Failed to check connection consistency', err);
    }

    const isConn = await this.sqlite.isConnection(DB_USERS, false);
    if (!isConn.result) {
      this.db = await this.sqlite.createConnection(
        DB_USERS,
        false,
        'no-encryption',
        1,
        false
      );
    } else {
      this.db = await this.sqlite.retrieveConnection(DB_USERS, false);
    }

    await this.db.open();

    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      fullName TEXT,
      email TEXT,
      contactNumber TEXT,
      age Number,
      premium TEXT,
      description TEXT,
      image TEXT
    );
  `;
  // const query=`ALTER TABLE users ADD COLUMN image TEXT`;
    await this.db.execute(query);
  }

  async loadUsers() {
    const users = await this.db.query('SELECT * FROM users');
    this.persons = users.values || []
    // return true;
  }
  getUsers() {
    return this.persons;
  }
  async insertPerson(person: Iperson) {

    const query = `
      INSERT INTO users (id, fullName, email, contactNumber, age,premium,description,image)
      VALUES (?, ?, ?, ?, ?, ?,?,?)
    `;
    const values = [
      person.id,
      person.fullName,
      person.email,
      person.contactNumber,
      person.age,
      person.premium,
      person.description,
      person.image
    ];
    const result = await this.db.query(query, values);
    this.loadUsers();
    return result
  }
  async updatePerson(person: Iperson) {
    const query = `
    UPDATE users 
    SET fullName = ?, email = ?, contactNumber = ?, age = ?, premium = ?,description=?,image=?
    WHERE id = ?
  `;
    const values = [
      person.fullName,
      person.email,
      person.contactNumber,
      person.age,
      person.premium,
      person.description,
      person.image,
      person.id
    ];
    await this.db.query(query, values);
    await this.loadUsers();
  }

  async deletePerson(id: string) {
    const query = `DELETE FROM users WHERE id = ?`;
    await this.db.query(query, [id]);
    await this.loadUsers();
  }

  async getPersonById(id: string) {
    const result = await this.db.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return result.values && result.values.length > 0 ? result.values[0] : null;
  }
}