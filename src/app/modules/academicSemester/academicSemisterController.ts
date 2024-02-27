import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ParsedQs } from 'qs'
import {
  IPaginationOptions,
  createSemisterService,
  deleteASemisterService,
  getAllSemisterService,
  getSingleSemisterService,
  updateASemisterService,
} from './academicSemisterService'
import { catchConAsync } from '../../../shared/catchConAsync'
import status from 'http-status'
import { pickQueryParam } from '../../../shared/pickQueryParam'
import { sendConResponse } from '../../../shared/sendResponse'

//cathConAsync use korar age controller evabe chilo
// export const createAcademicSemiCon: RequestHandler = async (req, res, next) => {
//   try {
//     const { semisterData } = req.body
//     const createdSemister = await createSemisterService(semisterData)
//     res.status(200).json({
//       success: true,
//       message: 'create semister successfully',
//       data: createdSemister,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

//catchConAsync ekti higher order function
//catchConAsync argument e ekti async middleware pathiye dey. catchConAsync ekti async middleware return kore

export const createAcademicSemiCon: RequestHandler = catchConAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, _next: NextFunction) => {
    const { semisterData } = req.body
    const createdSemister = await createSemisterService(semisterData)
    sendConResponse(res, {
      statusCode: status.OK,
      message: 'Semister create successfully!',
      data: createdSemister,
    })
  },
)
export const getAllSemisterCon: RequestHandler = catchConAsync(
  async (req, res) => {
    //req.query = { page: 1, limit: 2, sortBy: undefined, sortOrder: undefined }
    // const paginationOptions: IPaginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy as string, //sortBy ParsedQs and string[] hoyeo aste pare. sortBy and sortOrder kivabe asbe ta frontend er upor nirbor korbe
    //   sortOrder: req.query.sortOrder as string, ////sortORder ParsedQs and string[] hoyeo aste pare. sortOrder and sortBy kivabe asbe ta frontend er upor nirbor korbe
    // }
    // eslint-disable-next-line no-console
    // console.log(paginationOptions)
    const queryOptionObj: IPaginationOptions = pickQueryParam(req.query, [
      'page',
      'limit',
      'sortOrder',
      'sortBy',
    ])
    // eslint-disable-next-line no-console
    // console.log(queryOptionObj)

    //filters and search value
    const filters = pickQueryParam(req.query as ParsedQs, [
      'searchTerm',
      'title',
      'code',
      'year',
    ])
    // eslint-disable-next-line no-console
    console.log(filters) //{searcTerm:'Autu'|2364|02|'fa'}

    const semisters = await getAllSemisterService(filters, queryOptionObj)
    sendConResponse(res, {
      // meta:semisters.meta
      statusCode: status.OK,
      message: 'semister data successfully retrieved',
      data: semisters,
    })
  },
)
export const getSingleSemisterCon: RequestHandler = catchConAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req, res, _next) => {
    const { id } = req.params
    const oneSemister = await getSingleSemisterService(id)
    sendConResponse(res, {
      statusCode: status.OK,
      message: 'Semister retrived successfully',
      data: oneSemister,
    })
  },
)
export const updateASemisterCon: RequestHandler = catchConAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req, res, _next) => {
    const updatedSemister = await updateASemisterService(
      req.params.id,
      req.body.data,
    )
    sendConResponse(res, {
      statusCode: status.OK,
      message: 'Semister update successfully',
      data: updatedSemister,
    })
  },
)
export const deleteAsemisterCon: RequestHandler = catchConAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const deletedSemister = await deleteASemisterService(req.params.id)
    sendConResponse(res, {
      statusCode: status.OK,
      message: 'Semister deleted successfully',
      data: deletedSemister,
    })
  },
)
