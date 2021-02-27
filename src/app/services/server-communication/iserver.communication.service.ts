export interface IServerCommunicationService{
    fetchData();
    saveData(formData): Promise<any>;
    updateData(formData): Promise<any>;
    deleteData(): Promise<any>;
}