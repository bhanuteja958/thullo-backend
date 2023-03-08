const crypto = require('crypto');
const { getAttachmentCardId } = require('../services/attachments');
const { checkIfBoardAdmin, checkIfBoardMember } = require('../services/board');
const { getBoardIdOfCard } = require('../services/cards');
const { getCommentCardId } = require('../services/comments');
const { getLabelCardId } = require('../services/labels');

module.exports.checkPayloadSchema = (schema, payload) => {
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

module.exports.generateAPIResponse = (message,success=false, data=[]) => {
    return {
        success,
        message,
        data
    }
}

module.exports.generateRandomString = () => {
    const randomstring = crypto.randomBytes(20).toString('hex');
    return randomstring;
}

module.exports.checkIfUserIsBoardMember = async (id, idType, userId) => {
    try {
        let pkId = id;
        let cardIdResult = {};
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
            const boardIdResult = await getBoardIdOfCard(pkId);
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
            const checkIfBoardMemberResult = await checkIfBoardMember(pkId, userId);

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