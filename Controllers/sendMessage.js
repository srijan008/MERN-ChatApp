const Conversation = require("../Models/conversation");
const Message = require("../Models/message");

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Ensure this is correctly retrieved

        // Validate that senderId and receiverId are present
        if (!senderId || !receiverId) {
            return res.status(400).json({ error: 'Sender ID and Receiver ID are required' });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [] // Initialize with an empty array
            });
        }

        const newMessage = await Message.create({
            senderId, 
            receiverId, 
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id); // Corrected field name
            await conversation.save();
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


 const getMessages = async(req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate('messages');
        if(!conversation){
            res.json([]);
        }
        res.status(200).json(conversation)
    } catch (error) {
        res.json(error)
    }
}
module.exports = {sendMessage, getMessages};
