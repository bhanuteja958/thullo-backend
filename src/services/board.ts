import {QueryTypes} from 'sequelize';
import { generateServiceResponse } from '../common/helper.js';
import { Board } from '../models/Board.model.js';
import { BoardUserMapping } from '../models/BoardUserMapping.model.js';
import { getDBConnection } from './database.js';

const sequelize = getDBConnection();

export const createBoard = async (title: string, cover_photo_url: string, description: string, visibility: "public" | "private", loggedInUserId: string) => {
    try {
        const createBoardResult = await Board.create({
            title: title,
            cover_photo_url: cover_photo_url || null,
            description: description || null,
            visibility: visibility || 'public', 
            created_by: loggedInUserId
        });

        return generateServiceResponse(
            200,
            false,
            "Successfully created board",
            createBoardResult.dataValues
        );
    } catch (error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const getBoards = async(loggedInUserId: string) => {
    try {
        const boards = await sequelize.query({
            query: `
                (SELECT b.id, b.title, b.cover_photo_url,b.description, b.created_on, b.visibility FROM boards b WHERE created_by = ? or b.id IN (SELECT board_id from board_user_mapping where user_id = ?) ORDER BY created_on DESC);
            `,
            values: [loggedInUserId, loggedInUserId]
        }, {
            type: QueryTypes.SELECT
        });

        if(!boards) {
            return generateServiceResponse(
                200,
                false,
                "No boards exist for the given user",
                []
            )
        }

        const [results] = boards

        return generateServiceResponse(
            200,
            false,
            "Successfully fetched boards",
            results
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const getSingleBoard = async (boardId:string) => {
    try{
        const listsResult = await sequelize.query({
            query: `
                SELECT l.name, c.id,c.title, c.cover_photo_url, count(a.card_id) as attachments_count FROM list l LEFT JOIN card c on l.id = c.list_id LEFT JOIN attachments a on c.id = a.card_id where l.id in (SELECT * FROM list WHERE board_id = ?) GROUP BY a.card_id
                UNION
                SELECT l.name, c.id,c.title, c.cover_photo_url, count(co.card_id) as comments_count FROM list l LEFT JOIN card c on l.id = c.list_id LEFT JOIN comments co on c.id = co.card_id where l.id in (SELECT * FROM list WHERE board_id = ?) GROUP BY co.card_id
            `,
            values:[boardId, boardId],
        });

        if(!listsResult) {
            return generateServiceResponse(
                200,
                false,
                "No board with the given id exists",
                []
            )
        }

        const [results] = listsResult

        return generateServiceResponse(
            200,
            false,
            "Successfully fecthed board data",
            results
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const updateSingleBoard = async (boardId:string, loggedInUserId:string, boardValuesToBeUpdated:any) => {
    try{
        const boardResult = await Board.update ({
            ...boardValuesToBeUpdated
        }, {
            where: {
                id: boardId,
                created_by: loggedInUserId
            }
        });

        if(boardResult && boardResult[0] === 0) {
            return generateServiceResponse(
                200,
                false,
                'No Board with the given id exists',
                {}
            )
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully updated board"
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const deleteBoard = async (boardId:string, loggedInUserId: string) => {
    try {
        const deleteBoardResult = await Board.destroy({
            where: {
                created_by: loggedInUserId,
                id: boardId
            }
        });

        if(deleteBoardResult === 0) {
            return generateServiceResponse(
                200,
                false,
                'No Board with the given id exists',
            )
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully deleted board"
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }       
}

export const addMember = async (boardId:string, userId: string) => {
    try{
        const addMemberResult = await BoardUserMapping.create({
            board_id: boardId,
            user_id: userId,
        })

        return generateServiceResponse(
            200,
            false,
            "Successfully added the user as a member to the board",
            addMemberResult.dataValues
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const removeMember = async (boardId: string, userId:string) => {
    try {
        const removeMemberResult = await BoardUserMapping.destroy({
            where: {
                board_id:boardId,
                user_id: userId
            }
        })

        if(removeMemberResult === 0) {
            return generateServiceResponse(
                200,
                false,
                'No user with the given id is a member of the board',
            )
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully removed user from the board"
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const checkIfBoardAdmin = async(boardId:string, adminId:string) => {
    try {
        const boardResult:any = await Board.findOne({
            attributes: ['created_by'],
            where: {
                id: boardId
            }
        });

        if(!boardResult) {
            return generateServiceResponse(
                200,
                false,
                "No board with given id exists"
            )
        }

        if(boardResult.created_by === adminId) {
            return generateServiceResponse(
                200,
                false,
                "Given user is the admin user"

            )
        } else {
            return generateServiceResponse(
                403,
                true,
                "You don't have permission to take this action on the board"
            )
        }  
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const checkIfBoardMember = async (boardId:string, userId: string) => {
    try {
        const checkIfBoardMemberResult = await BoardUserMapping.findOne({
            where: {
                user_id: userId,
                board_id: boardId,
            }
        });

        if(!checkIfBoardMemberResult) {
            return generateServiceResponse(
                403,
                true,
                "You dont have permission to do this action",
            )
        }

        return generateServiceResponse(
            200,
            false,
            "User is a board member"
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
} 

export const checkIfAlreadyMember = async (boardId:string, userId:string ) => {
    try {
        const checkIfAlreadyMemberResult = await BoardUserMapping.findOne({
            where: {
                user_id:userId,
                board_id:boardId,
            }
        });

        if(checkIfAlreadyMemberResult) {
            return generateServiceResponse(
                200,
                false,
                'User is already a member',
                {
                    isMember: true
                }
            )
        }

        return generateServiceResponse(
            200, 
            false,
            "User is not a member",
            {
                isMember: false
            }
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}