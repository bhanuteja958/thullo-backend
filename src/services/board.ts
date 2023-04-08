import {QueryTypes} from 'sequelize';
import { Board } from '../models/Board.model.js';
import { BoardUserMapping } from '../models/BoardUserMapping.model.js';
import { getDBConnection } from './database.js';

const sequelize = getDBConnection();

export const createBoard = async (boardData) => {
    try {
        const createBoardResult = await Board.create({
            title: boardData.title,
            cover_photo_url: boardData.coverPhotoUrl || null,
            description: boardData.description || null,
            visibility: boardData.visibility || 'public', 
            created_by: boardData.userId
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

export const getBoards = async( userId) => {
    try {
        const boards = await sequelize.query({
            query: `
                (SELECT b.id, b.title, b.cover_photo_url,b.description, b.created_on, b.visibility FROM boards b WHERE created_by = ? or b.id IN (SELECT board_id from board_user_mapping where user_id = ?) ORDER BY created_on DESC);
            `,
            values: [userId, userId]
        }, {
            type: QueryTypes.SELECT
        });

        const [results, metadata] = boards

        return results;
    } catch(error) {
        console.log('Error while fetching boards : ', error);
        return {
            errorMessage: 'Error while fetching boards',
            status: 400
        }
    }
}

export const getSingleBoard = async (boardId) => {
    try{
        const listsResult:any = await sequelize.query({
            query: `
                SELECT l.name, c.id,c.title, c.cover_photo_url, count(a.card_id) as attachments_count FROM list l LEFT JOIN card c on l.id = c.list_id LEFT JOIN attachments a on c.id = a.card_id where l.id in (SELECT * FROM list WHERE board_id = ?) GROUP BY a.card_id
                UNION
                SELECT l.name, c.id,c.title, c.cover_photo_url, count(co.card_id) as comments_count FROM list l LEFT JOIN card c on l.id = c.list_id LEFT JOIN comments co on c.id = co.card_id where l.id in (SELECT * FROM list WHERE board_id = ?) GROUP BY co.card_id
            `,
            values:[boardId, boardId],
        });

        if(!listsResult) {
            return {
                errorMessage: 'No board with the given id exists',
                status: 400
            }
        }

        return listsResult.results
    } catch(error) {
        console.log('Error while fetching board data: ', error);
        return {
            errorMessage: 'Error while fetching board data',
            status: 400
        }
    }
}

export const updateSingleBoard = async (boardId, userId, boardValuesToBeUpdated) => {
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

export const deleteBoard = async (boardId, userId) => {
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

export const addMember = async (board_id, user_id) => {
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

export const removeMember = async (board_id, user_id) => {
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

export const checkIfBoardAdmin = async(board_id, admin_id) => {
    try {
        const boardResult:any = await Board.findOne({
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
                errorMessage: "You don't have permission to take this action on the board",
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

export const checkIfBoardMember = async (board_id,user_id) => {
    try {
        const checkIfBoardMemberResult = await BoardUserMapping.findOne({
            where: {
                user_id,
                board_id,
            }
        });

        if(!checkIfBoardMemberResult) {
            return {
                errorMessage: "You dont have permission to do this action",
                status: 403,
            }
        }

        return true;
    } catch(error) {
        console.log('Error while checking board member: ', error);
        return {
            errorMessage: 'Something went wrong',
            status: 400
        }
    }
} 

export const checkIfAlreadyMember = async (board_id, user_id ) => {
    try {
        const checkIfAlreadyMemberResult = await BoardUserMapping.findOne({
            where: {
                user_id,
                board_id,
            }
        });

        if(checkIfAlreadyMemberResult) {
            return {
                errorMessage: 'User is already a member',
                status: 200
            }
        }

        return true;
    } catch(error) {
        console.log('Error while checking already board member: ', error);
        return {
            errorMessage: 'Something went wrong',
            status: 400
        }
    }
}