import mongoose, { Document, Model, Schema } from "mongoose";

import bcrypt from "bcryptjs";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
  profilePic: string;
  location: string;
  contact: number;
  about: string;
  education: {
    college: string;
    degree: string;
    from: Date;
    to: Date;
  }[];
  workExperience: {
    company: string;
    position: string;
    from: Date;
    to: Date;
  }[];
  isPro: boolean;
  proExpiry: Date;
  paymentDetails?: {
    paymentId: string;
    amount: number;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: "user.png",
    },
    location: {
      type: String,
      default: "",
    },
    contact: {
      type: Number,
    },
    about: {
      type: String,
      default: "",
    },
    education: {
      type: [
        {
          college: {
            type: String,
            required: true,
          },
          degree: {
            type: String,
            required: true,
          },
          from: {
            type: Date,
            required: true,
          },
          to: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
    workExperience: {
      type: [
        {
          company: {
            type: String,
            required: true,
          },
          position: {
            type: String,
            required: true,
          },
          from: {
            type: Date,
            required: true,
          },
          to: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
    isPro: {
      type: Boolean,
      default: false,
    },
    proExpiry: {
      type: Date,
      required: false,
    },
    paymentDetails: [
      {
        paymentId: {
          type: String,
          required: false,
        },
        amount: {
          type: Number,
          required: false,
        },
        date: {
          type: Date,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.index({ name: "text" });

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
