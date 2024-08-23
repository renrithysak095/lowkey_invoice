type LayoutItem = {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static: boolean;
    minH: number;
    minW: number;
};

type subRow1 = {
    description: string;
    quantity: string;
    unit_price: string;
    amount: string;
}


type SubRow = {
    description: string;
    quantity: string;
    unit_price: string;
    amount: string;
    subRow1: subRow1[]
}

type TableProps = {
    border: string | "";
    fontFamily: string | "";
    fontSize: string | "";
    fontWeight: string | "";
    textTransform: string | "";
    backgroundColor: string | "";
    color: string | "";
    textAlign: string | "";
    padding: string | "";
    whiteSpace: string | "";
    lineHeight: string | "";
};

type HeaderProps = TableProps;

type BodyItem = {
    no: number;
    subRow: SubRow[];
    description: string;
    quantity: string;
    unit_price: string;
    amount: string;
};

type TableContent = {
    thead?: string[];
    tbody?: BodyItem[];
    props: TableProps;
};

type TableData = {
    type: string;
    content: TableContent[];
};

type Item = {
    key: string;
    data: TableData;
};

type BodyItemsState = {
    layout: LayoutItem[];
    items: Item[];
};

type ContextMenuState = {
    visible: boolean;
    x: number;
    y: number;
    key: string | null;
};
