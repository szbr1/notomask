// models/Subscription.ts
import mongoose, { Schema, Document } from "mongoose";

export interface SubscriptionProps extends Document {
  name: string;
  renewDate: Date;
  totalCost: number;
  planDuration: number; // in months
  username?: string;
  password?: string;
  store?: string;
  pins?: string;
}

const SubscriptionSchema = new Schema<SubscriptionProps>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    renewDate: {
      type: Date,
    },
    totalCost: {
      type: Number,
    },
    planDuration: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    store: {
      type: String,
      trim: true,
    },
    pins: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Virtual to calculate per month cost dynamically
SubscriptionSchema.virtual("perMonthCost").get(function (this: SubscriptionProps) {
  return this.totalCost / this.planDuration;
});

export default mongoose.models.Subscription ||
  mongoose.model<SubscriptionProps>("Subscription", SubscriptionSchema);
