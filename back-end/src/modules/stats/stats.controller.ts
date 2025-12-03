import { Request, Response } from "express";
import { createAsyncFn } from "../../utils/create.async.fn";
import { sendResponse } from "../../utils/send.response";
import { statsServices } from "./stats.services";

const getAdminStats=createAsyncFn(async(req:Request,res:Response)=>{
  const stats=await statsServices.getAdminStats();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Stats fetched successfully',
    data: stats,
  });
})

export const statsController={
  getAdminStats
}