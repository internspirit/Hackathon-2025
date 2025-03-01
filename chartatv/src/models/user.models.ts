import mongoose from "mongoose";
import { Schema } from "mongoose";



const userSchema = new Schema(
  {
    name: {
        type: String,
       
    },
    email:{
        type: String,
    },
    industry: {
        type: String,
     
    },
    revenue: {
        type: String,
     
    },
    employees: {
        type: String,
     
    },
    description: {
        type: String,
     
    },
    password: {
        type: String,
     
    },
    hs_code:{
        type: String,
    },
    bussinessName:{
        type: String,
    },

    countries: {
        type: [
            {
            country: {
                type: String,
            },
            base_price_there: {
                type: String,
            },
            competitors: {
                type: [String],
            },
            export_duties: {
                type: String,
            },
            selling_price: {
                type: String,
            },
            rationale: {
                type: String,
            },
            profit: {
                type: String,
            },
            selected: {
                type: Boolean,
            }
            }
        ],
        default: [],
    },

}

);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
