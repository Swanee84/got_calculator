// import { Schema } from '@nestjs/mongoose'
import { Document, Schema, model } from 'mongoose';

export const LoggingSchema = new Schema({
  method: { type: String, required: false },
  url: { type: String, required: false },
  params: { type: Object, required: false },
  body: { type: Object, required: false },
  query: { type: Object, required: false },
  processTime: { type: Number, required: false },
  status: { type: Number, required: false },
  success: { type: Boolean, required: false },
  message: { type: String, required: false },
  stack: { type: String, required: false },
  signedUser: { type: Object, required: false },
});

export interface Logging extends Document {
  method?: string;
  url?: string;
  params?: any;
  body?: any;
  query?: any;
  processTime?: number;
  status?: number;
  success?: boolean;
  message?: string;
  stack?: string;
  signedUser?: any;
}

export const LoggingModel = model<Logging>('logging', LoggingSchema);

export const SignInLogSchema = new Schema({
  userId: { type: Number, required: false },
  email: { type: String, required: false },
  lastSignAt: { type: Date, required: true, default: Date.now },
});

export interface SignInLog extends Document {
  userId?: number;
  email?: string;
  lastSignAt?: Date;
}

export const SignInLogModel = model<SignInLog>('sign_in_log', SignInLogSchema);

export const SignFailLogSchema = new Schema({
  userId: { type: Number, required: false },
  email: { type: String, required: false },
  signDate: { type: Date, required: true, default: Date.now },
});

export interface SignFailLog extends Document {
  userId?: number;
  email?: string;
  signDate?: Date;
}

export const SignFailLogModel = model<SignFailLog>('sign_fail_log', SignFailLogSchema);
