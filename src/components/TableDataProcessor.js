const processTableData = (data) => {
  const topNodes = data.filter(node => node.place === 'top');
  const leftNodes = data.filter(node => node.place === 'left');

  const generateColumns = (nodes, parentKey = '') => {
    return nodes.map(node => {
      const key = parentKey ? `${parentKey}.${node.name}` : node.name;
      const column = {
        title: node.name,
        dataIndex: key,
        key: key,
        children: node.children ? generateColumns(node.children, key) : [],
        onHeaderCell: () => ({
          style: {
            fontWeight: node.font_weight,
            fontStyle: node.font_style,
            textAlign: node.text_align,
            fontSize: `${node.font_size}px`,
            writingMode: node.orientation === 'vertical' ? 'vertical-lr' : 'horizontal-tb',
          },
        }),
      };
      return column;
    });
  };

  const generateRows = (nodes, parentKey = '') => {
    return nodes.map(node => {
      const key = parentKey ? `${parentKey}.${node.name}` : node.name;
      const row = {
        ...node,
        key: key,
        children: node.children ? generateRows(node.children, key) : [],

        onHeaderCell: () => ({
          style: {
            fontWeight: node.font_weight,
            fontStyle: node.font_style,
            textAlign: node.text_align,
            fontSize: `${node.font_size}px`,
            writingMode: node.orientation === 'vertical' ? 'vertical-lr' : 'horizontal-tb',
          },
        }),
      };

      if (node.children && node.children.length > 0) {
        row.children = generateRows(node.children, key);
      }

      return row;
    });
  };

  const columns = generateColumns(topNodes);
  const dataSource = generateRows(leftNodes);

  return { columns, dataSource };
};

export { processTableData };
