"use server";

import Database from "better-sqlite3";

const maindbFileName = "app.db";

///////////////////////// INSERT DATA /////////////////////////
export const insertClient = async (data: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const stmt = db.prepare(
    "INSERT INTO clientData (firstName, lastName, email, nationality, jobRole, linkedInLink, gitHubLink, password, birthDate, contactNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  const info = stmt.run(
    data.firstName,
    data.lastName,
    data.email,
    data.nationality,
    data.jobRole,
    data.linkedInLink,
    data.gitHubLink,
    data.password,
    data.birthDate,
    data.contactNumber
  );

  db.close();
  if (info.changes == 1) {
    return Promise.resolve({
      success: true,
      msg: "Data Saved",
      lastInsertRowid: info.lastInsertRowid,
    });
  } else {
    return Promise.reject({ success: false, msg: "Insert failed" });
  }
};

///////////////////////// GET DATA /////////////////////////
export const getClientList = async () => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM clientData").all();

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// GET DATA BY ID /////////////////////////
export const getClient = async (id: number) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM clientData WHERE id = ?").get(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// UPDATE DATA BY ID /////////////////////////
export const updateClient = async (clientData: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  try {
    const res = db
      .prepare(
        "UPDATE clientData SET firstName=?, lastName=?, email=?, nationality=?, jobRole=?, linkedInLink=?, gitHubLink=?, password=?, birthDate=? WHERE id=?"
      )
      .run(
        clientData.firstName,
        clientData.lastName,
        clientData.email,
        clientData.nationality,
        clientData.jobRole,
        clientData.linkedInLink,
        clientData.gitHubLink,
        clientData.password,
        clientData.birthDate,
        clientData.id
      );

    db.close();

    return Promise.resolve({
      success: true,
      msg: "All Data Updated",
      data: res,
    });
  } catch (error: any) {
    return Promise.resolve({
      success: false,
      msg: "Data Didn't Updated",
      data: error.message,
    });
  }
};

///////////////////////// DELETE DATA BY ID /////////////////////////
export const deleteClientId = async (id: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("DELETE FROM clientData WHERE id = ?").run(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "Data Deleted",
    data: res,
  });
};
