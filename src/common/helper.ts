import crypto from 'crypto';
import { getAttachmentCardId } from '../services/attachments.js';
import { checkIfBoardAdmin, checkIfBoardMember } from '../services/board.js';
import { getBoardIdOfCard } from '../services/cards.js';
import { getCommentCardId } from '../services/comments.js';
import { getLabelCardId } from '../services/labels.js';
import { getBoardIdForList } from '../services/list.js';

export const checkPayloadSchema = (schema:any, payload:any) => {
    const {error} = schema.validate(payload);

    if(error) {
        return {
            errorMessage: error.details[0].message,
            status: 400,
        }
    }

    return {
        errorMessage: ''
    }
}

export const generateAPIResponse = (message:string,success:boolean=false, data:any=[]) => {
    return {
        success,
        message,
        data
    }
}

export const generateServiceResponse = (isError: boolean, message: string, data:any={}) => {
    return {
        isError,
        message,
        data
    }
}

export const generateRandomString = () => {
    const randomstring = crypto.randomBytes(20).toString('hex');
    return randomstring;
}

export const checkIfUserIsBoardMember = async (id:any, idType:any, userId:any) => {
    try {
        let pkId = id;
        let cardIdResult:any = {};
        if(['comment','attachment', 'label'].includes(idType)) {
            switch(idType) {
                case 'comment':
                    cardIdResult = await getCommentCardId(pkId);
                    break;
                case 'attachment':
                    cardIdResult = await getAttachmentCardId(pkId);
                    break;
                case 'label':
                    cardIdResult = await getLabelCardId(pkId);
                    break;
            }

            if(cardIdResult.errorMessage) {
                return cardIdResult;
            }

            pkId = cardIdResult.card_id;
        }

        if (['card','comment','attachment','label'].includes(idType)) {
            const boardIdResult:any = await getBoardIdOfCard(pkId);
            if(boardIdResult.errorMessage) {
                return boardIdResult;
            }

            pkId = boardIdResult.list.board_id;
        }

        if (idType === 'list') {
            const boardIdResult = await getBoardIdForList(pkId);
            if(boardIdResult.errorMessage) {
                return boardIdResult;
            }

            pkId = boardIdResult;
        }

        const checkIfBoardAdminResult = await checkIfBoardAdmin(pkId, userId);

        if(!checkIfBoardAdminResult.errorMessage) {
            return true;
        } else {
            const checkIfBoardMemberResult:any = await checkIfBoardMember(pkId, userId);

            if(checkIfBoardMemberResult.errorMessage) {
                return checkIfBoardMemberResult;
            } else {
                return true
            }
        }
    } catch(error) {
        console.log("Error while checking if board member:", error);
        return {
            errorMessage: "Something went wrong",
            status: 400
        };
    }
}