
// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const CreateChat = async (req, res) => {
    try {
        const creator = req.user.username
        const member = req.body.username
        if(!creator || !member) {
            res.status(400)
            throw new Error("Chat members not found")
        }
        const members = [creator, member]
        const chat = await createChat(members)
        res.status(200).json(chat)

    } catch (error) {
        
    }
}

const GetChat = async (req, res) => {

}

const DeleteChat = async (req, res) => {

}

const CreateGroupChat = async (req, res) => {

}

const AddGroupMember = async (req, res) => {

}

const RemoveGroupMember = async(req, res) => {

}

const ChangeChatName = async (req, res) => {

}

const ChangeGroupAdmin = async (req, res) => {

}

module.exports = {
    CreateChat,
    GetChat,
    DeleteChat,
    CreateGroupChat,
    AddGroupMember,
    RemoveGroupMember,
    ChangeChatName,
    ChangeGroupAdmin,
}