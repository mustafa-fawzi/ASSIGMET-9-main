import usermodel from "../../DB/models/user.model.js"


export const cerateuser = async(req,res)=>{
try {
    // const user = await usermodel(req.body);
    // await user.save();


    const user = await usermodel.create([req.body],{
        validateBeforeSave:true
    });
    return res.status(200).json({message:"Done"})
} catch (error) {
    return res.status(500).json({message:"Error : ",error})
}

} 


export const serachuser = async(req,res)=>{
    const {email, password} = req.body
try {
    const user = await usermodel.findOne({email});
    if(!user){
    return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });

    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
        }
};



export const updateUser = async (req, res) => {
    const { email } = req.body;

    try {
    const result = await usermodel.updateOne(
        { email },
        { $set: req.body }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Updated", result });

    } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
    }
};






export const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
    const result = await usermodel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Deleted", result });

    } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
    }
};





export const getusers = async(req,res)=>{
    const userid = req.body.id;
    try{
        const users = await usermodel.findById(userid);
        if(!users){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "USERS", users });
    }
    catch(error){

    return res.status(500).json({ message: "Server error", error: error.message });
    }
}