const Users = require("../models/auth_model");
const Requests = require("../models/approval_model");


const pendingAll = async (req, res) => {
  try {
    const pending_users = await Users.findAll({
      where: {
        approved: false,
      },
      attributes: ["user_id", "name", "email", "role", "created_at"],
    });
    res.status(200).json({pending_users});
  } catch (err) {
    return res.json({ message: "Something went wrong" });
  }
};

const approved_users = async(req, res) => {
  try{
  const user_history = await Requests.findAll({
    where: {
      decision: true,
    }
  });
  res.status(200).json({user_history});
  }
  catch (err){
    return res.json({message: "Something went wrong"});
  }

}

const decision = async (req,res) => {
    const{requester_id, decision, decision_date, user_id_approver} = req.body;
    const approver_name = await Users.findOne({where: {user_id : user_id_approver}, attributes: ["name"]}).name;
    const requester = await Users.findOne({where: {user_id: requester_id}, attributes: ["user_id", "role", "name"]});
    try{
        await Requests.create({
            user_id: requester_id,
            name: requester.name,
            role: requester.role,
            decision,
            approved_at: decision_date,
            approved_by_name: approver_name,
            approved_by_id: user_id_approver,
        })
        requester.approved = decision;
        await requester.save();
    }catch(err)
    {
      console.log("Something went wrong", err);
    }
    return res.status(200);
};

const revoke_access = async (req,res) => {
  const id = req.body.id;
  console.log(id);
  //get user from the history
  const user = await Requests.findOne({where: {id : id}});
  user_id = user.user_id;

  //remove the user from the main users table
  await Users.destroy({
    where: {user_id: user_id}
  })

  //remove user from approved list
  await user.destroy();

  return res.status(200);
};

module.exports = { pendingAll, decision, approved_users, revoke_access };
