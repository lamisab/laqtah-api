export function upsertPortressController(Data: any[], newAccount: any) {
	const dataIndex = Data.findIndex((el) => el.id === newAccount.id);
	if (dataIndex === -1) {
		Data.push(newAccount);
	} else {
		newAccount[dataIndex] = {
			...Data[dataIndex],
			...newAccount,
		};
	}
	return Data;
}