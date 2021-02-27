export interface Team {
    id?: number;
    teamName: string,
    companyId: number,
    branchId: number,
    entryUserId: number,
    teamMembers?: number[],
    teamDetails: TeamDetails[]
}

export interface TeamDetails {
    teamDetailsId?: number;
    teamId?: number;
    userId: number;
}
