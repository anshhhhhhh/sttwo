const pool = require('./db');
const HttpError = require("../models/http-error");

const createNoticeQuery = async (title, content, start_date, end_date, userId) => {
  try {
    const result = await pool.query('CALL createNotice($1,$2,$3,$4,$5,$6);', [
      title, content, start_date, end_date, userId, null
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-createNoticeQuery", 500);
    }
  }
};

const getNoticesQuery = async (userId, active, id) => {
  try {
    const result = await pool.query('SELECT * FROM getnotices($1, $2, $3);', [
      userId,
      active,
      id
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-getNoticesQuery", 500);
    }
  }
};

const updateNoticeQuery = async (title, content, start_date, end_date, userId, id) => {
  try {
    const result = await pool.query('SELECT * FROM updatenotice($1, $2, $3, $4, $5, $6);', [
      id,
      userId,
      title, 
      content, 
      start_date, 
      end_date
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-updateNoticesQuery", 500);
    }
  }
};

const deleteNoticeQuery=async(id, userId)=>{
  try{
    const result = await pool.query('SELECT * FROM deletenotice($1, $2);', [
      id,
      userId
    ]);
    console.log(result.rows);
  }catch(error){
    if (error instanceof HttpError) {
      return next(error);
    } else {
      if(error.length==176){
        throw new HttpError("You do not have permission to delete this notice", 403);
      }else if(error.length===149){
        throw new HttpError("Notice does not exist", 404);
      }
      throw new HttpError("Something went wrong-deleteNoticesQuery", 500);
    }
  }
}

module.exports = { createNoticeQuery,getNoticesQuery, updateNoticeQuery, deleteNoticeQuery };


