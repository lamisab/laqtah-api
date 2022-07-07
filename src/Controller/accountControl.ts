            
export function UpdateAccountController(reserve: any[],newAccount: any[]){
    const resIndex = reserve.findIndex((el) => el.id ===(newAccount as any).id as string);
    if (resIndex === -1){
        return 'you have not book yet !'
    }else{
        reserve[resIndex]={
            ...reserve[resIndex],
            ...newAccount,
           
        }
    }return reserve;
}