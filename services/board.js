const { Board } = require("../models/Board.model")

const createBoard = async (boardData) => {
    try {
        const createBoardResult = await Board.create({
            title: boardData.title,
            cover_photo_url: boardData.cover_photo_url || '',
            description: boardData.description || '',
            visibility: boardData.visibility || 'public',
            created_by: boardData.user_id
        });

        return createBoardResult;
    } catch (error) {
        console.log('Error while creating board : ', error);
        return {
            errorMessage: 'Error while creating board',
            status: 400
        }
    }
}

const getBoards = async( userId) => {
    try {
        const boards = await Board.findAll({
            attributes:['id','title','cover_photo_url','description','created_on','visibility'],
            where: {
                created_by: userId
            },
            order: [
                ['created_on', 'DESC']
            ]
        });

        return boards
    } catch(error) {
        console.log('Error while fetching boards : ', error);
        return {
            errorMessage: 'Error while fetching boards',
            status: 400
        }
    }
}

module.exports = {
    createBoard,
    getBoards
}