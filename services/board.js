const { Board } = require("../models/Board.model");
const { BoardUserMapping } = require("../models/BoardUserMapping.model");
const { User } = require("../models/User.model");

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

const getSingleBoard = async (boardId, userId) => {
    try{
        const boardResult = await Board.findOne({
            attributes:['id','title','cover_photo_url','description','created_on','visibility'],
            where: {
                created_by: userId,
                id: boardId
            }
        });

        console.log(boardResult);

        if(!boardResult) {
            return {
                errorMessage: 'No board with the given id exists',
                status: 400
            }
        }

        return boardResult
    } catch(error) {
        console.log('Error while fetching board data: ', error);
        return {
            errorMessage: 'Error while fetching board data',
            status: 400
        }
    }
}

const updateSingleBoard = async (boardId, userId, boardValuesToBeUpdated) => {
    try{
        const boardResult = await Board.update ({
            ...boardValuesToBeUpdated
        }, {
            where: {
                id: boardId,
                created_by: userId
            }
        });

        if(boardResult && boardResult[0] === 0) {
            return {
                errorMessage: 'No Board with the given id exists',
                status: 400
            }
        }

        return boardResult
    } catch(error) {
        console.log('Error while updating board data data: ', error);
        return {
            errorMessage: 'Error while uopdating board data',
            status: 400
        }
    }
}

const deleteBoard = async (boardId, userId) => {
    try {
        const deleteBoardResult = await Board.destroy({
            where: {
                created_by: userId,
                id: boardId
            }
        });

        if(deleteBoardResult === 0) {
            return {
                errorMessage: 'No Board with the given id exists',
                status: 400
            }
        }

        return deleteBoardResult
    } catch(error) {
        console.log('Error while deleting board: ', error);
        return {
            errorMessage: 'Error while deleting board',
            status: 400
        }
    }       
}

const addMember = async (board_id, user_id) => {
    try{
        const addMemberResult = await BoardUserMapping.create({
            board_id,
            user_id,
        })

        return addMemberResult;
    } catch(error) {
        console.log('Error while adding member to board: ', error);
        return {
            errorMessage: 'Error while adding member board',
            status: 400
        }
    }
}

const removeMember = async (board_id, user_id) => {
    try {
        const removeMemberResult = await BoardUserMapping.destroy({
            where: {
                board_id,
                user_id
            }
        })

        if(removeMemberResult === 0) {
            return {
                errorMessage: 'No user with the given id exists with the given board id',
                status: 400
            }
        }

        return removeMemberResult
    } catch(error) {
        console.log('Error while removing member from board: ', error);
        return {
            errorMessage: 'Error while removing member from board',
            status: 400
        }
    }
}

const checkIfBoardAdmin = async(board_id, admin_id) => {
    try {
        const boardResult = await Board.findOne({
            attributes: ['created_by'],
            where: {
                id: board_id
            }
        });

        if(!boardResult) {
            return {
                errorMessage: "No board with given id exists",
                status: 400,
            }
        }

        if(boardResult.created_by === admin_id) {
            return boardResult
        } else {
            return {
                errorMessage: "You don't have permission to add/remove  members to/from the board",
                status: 403,
            }
        }  
    } catch(error) {
        console.log('Error while checking board admin: ', error);
        return {
            errorMessage: 'Something went wrong',
            status: 400
        }
    }
}

module.exports = {
    createBoard,
    getBoards,
    getSingleBoard,
    updateSingleBoard,
    deleteBoard,
    addMember,
    removeMember,
    checkIfBoardAdmin
}