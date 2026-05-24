import e from 'express';
import Student from '../models/student.js';
import { isAdmin } from './userController.js';

// export function getAllStudents(req, res) {
//     Student.find().then(
//         (students) => {
//             console.log(students);
//             res.json(students);
//         }
//     );
// };

export async function getAllStudents(req, res) {

    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching students" });
    }
}

export function createStudent(req, res) {
    if(isAdmin(req)){
        const student = new Student
        ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address   
        });

        student.save().then(
        (savedStudent) => {
            res.json({ message: "Student saved successfully" });
        }
    ).catch(
        (error) => {
            console.error(error);
            res.status(500).json({ message: "Error saving student" });
        }
    );
    }else {
        res.status(403).json({ message: "You need to login as an admin to create a student" });
    }
}