import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({ // create a schema for the student collection in the database, it defines the structure of the documents in the collection
    name: String,
    age: Number,
    city: String
});

const Student = mongoose.model("Student", studentSchema); // get controller for the student collection in the database, if it doesn't exist, it will be created 
// variable name starting letter should be capitalized.
export default Student;
