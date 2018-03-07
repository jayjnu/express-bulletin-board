import DataAccess from "./data-access";

type ServiceOption = {
    dataSource: any
};

type PostingQuery = {
    boardId: string
    postingId: string
};

class Service {
    private dataAccess: DataAccess;
    constructor({ dataSource }: ServiceOption) {
        this.dataAccess = new DataAccess({ dataSource });
    }

    async getContentPage({ boardId, postingId }: PostingQuery) {
        return await this.dataAccess.getPostById(boardId, postingId);
    }

    async writeNewPost() {

    }

    async deletePosting({ boardId, postingId }: PostingQuery) {
        return await this.dataAccess.deletePosting(boardId, postingId);
    }
}

export default Service;