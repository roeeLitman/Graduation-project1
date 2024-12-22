export interface ListAmountType {
    typeAttack: string; 
    ampount: number;   
    _id: string;        
}

export interface AttackData {
    _id: string;             
    year: number;            
    listAmontType: ListAmountType[]
}