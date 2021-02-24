// // import { Schema } from '@nestjs/mongoose'
// import { Document, Schema, model } from 'mongoose';
//
// export const LoggingSchema = new Schema({
//   method: { type: String, required: false },
//   url: { type: String, required: false },
//   params: { type: Object, required: false },
//   body: { type: Object, required: false },
//   query: { type: Object, required: false },
//   processTime: { type: Number, required: false },
//   status: { type: Number, required: false },
//   success: { type: Boolean, required: false },
//   message: { type: String, required: false },
//   stack: { type: String, required: false },
// });
//
// export interface Logging extends Document {
//   method?: string;
//   url?: string;
//   params?: any;
//   body?: any;
//   query?: any;
//   processTime?: number;
//   status?: number;
//   success?: boolean;
//   message?: string;
//   stack?: string;
// }
//
// export const LoggingModel = model<Logging>('logging', LoggingSchema);
//
// export const SignInLogSchema = new Schema({
//   academyId: { type: Number, required: false },
//   branchId: { type: Number, required: false },
//   userId: { type: Number, required: false },
//   category: { type: String, required: false },
//   signDate: { type: String, required: false },
//   signTime: { type: String, required: false },
//   lastSignAt: { type: Date, required: true, default: Date.now },
// });
//
// export interface SignInLog extends Document {
//   academyId?: number;
//   branchId?: number;
//   userId?: number;
//   category?: string;
//   signDate?: Date;
//   signTime?: Date;
//   lastSignAt?: Date;
// }
//
// export const SignInLogModel = model<SignInLog>('sign_in_log', SignInLogSchema);
