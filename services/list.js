const { List } = require("../models/List.model")

const createList = async (list_name, board_id, user_id) => {
    try {
        const createListResult = await List.create({
            name: list_name,
            board_id,
            created_by: user_id,
        })

        return createListResult
    } catch(error) {
        console.log('Error while creating list: ', error);
        return {
            errorMessage: 'Error while creating list',
            status: 400
        }
    }
}

const updateList = async (new_list_name, list_id) => {
    try {
        const updateListResult = await List.update({
            name: new_list_name,
        }, {
            where: {
                id: list_id
            }
        })

        if(updateListResult[0] === 0) {
            return {
                errorMessage: 'No list with the given id exists',
                status: 400
            }
        }

        return updateListResult[0]
    } catch(error) {
        console.log('Error while updating list: ', error);
        return {
            errorMessage: 'Error while updating list',
            status: 400
        }
    }
}

const deleteList = async (list_id) => {
    try{
        const deleteListResult = await List.destroy({
            where: {
                id: list_id
            }
        })

        if(deleteListResult === 0) {
            return {
                errorMessage: 'No list with the given id exists',
                status: 400
            }
        }

        return deleteListResult
    } catch(error) {
        console.log('Error while deleting list: ', error);
        return {
            errorMessage: 'Error while deleting list',
            status: 400
        }
    }
}

const getBoardIdForList = async (list_id) => {
    try {
        const boardIdForList = await List.findByPk(list_id, {
            attributes:['board_id']
        });
        if(!boardIdForList) {
            return {
                errorMessage: 'No list with the given id exists',
                status: 400,
            }
        }
        return boardIdForList.board_id
    } catch(error) {
        console.log('Error while getting board_id of list: ', error);
        return {
            errorMessage: 'Something went wrong',
            status: 400
        }
    }
}

module.exports = {
    createList,
    updateList,
    deleteList,
    getBoardIdForList
}