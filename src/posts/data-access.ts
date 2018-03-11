type DataAccessOption = {
    dataSource: any
};

class DataAccess {
    private dataSource: any;
    constructor({ dataSource }: DataAccessOption) {
        this.dataSource = dataSource;
    }

    writeNewPost() {

    }

    listPosts() {

    }

    async deletePosting(boardId: string, postingId: string) {
        const query = `DELETE FROM bbs WHERE boardId = '${boardId}' && postingId = '${postingId}'`;
        return await this.dataSource.query(query);
    }

    async getPostById(boardId: string, postingId: string) {
        const query = `SELECT * FROM bbs WHERE boardId = '${boardId}' && postingId = '${postingId}'`;
        return await this.dataSource.query(query);
    }
}

export default DataAccess;