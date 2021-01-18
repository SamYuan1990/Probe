const todos = (state = [{order:0, cmdType: 'Shell', args:[]}], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    orderer: state.length,
                    cmdType: 'Shell',
                    args : []
                }
            ];
        case 'REMOVE_TODO':
            state.pop();
            return state;
        case 'TYPE_TAPE':
            console.log(action);
            console.log(state);
            return state;
        default:
            return state;
    }
};

export default todos;

/*
id:{
  orderer: id,
  cmdType: string,
  args : []
}
*/