import { useDrop } from "react-dnd";
import { useRef } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";

const DragCompo = ({ headerItems, setHeaderItems }: any) => {
  const dropRefs = useRef<(HTMLDivElement | null)[]>([]);

  // const [, drop]: any = useDrop({
  //     accept: 'KEY_ITEM',
  //     drop: (item: any, monitor: any) => {
  //         const offset = monitor.getClientOffset();

  //         if (offset) {
  //             const dropElement = dropRefs.current.find(ref => ref && ref.getBoundingClientRect().bottom > offset.y && ref.getBoundingClientRect().top < offset.y);

  //             if (dropElement) {
  //                 const index = dropRefs.current.indexOf(dropElement);

  //                 if (index !== -1) {
  //                     setHeaderItems((prevHeaderItems: any) => {
  //                         // Replace the item at the index
  //                         console.log("prevHeaderItems?.items >> ", prevHeaderItems?.items);
  //                         return prevHeaderItems?.items?.map((headerItem: any, i: any) => {
  //                             if (i === index) {
  //                                 return { ...headerItem, key: item.key };
  //                             }
  //                             return headerItem;
  //                         });
  //                     });
  //                 }
  //             }
  //         }
  //     },
  //     collect: (monitor) => ({
  //         isOver: monitor.isOver(),
  //     }),
  // });

  const [, drop]: any = useDrop({
    accept: "KEY_ITEM",
    drop: (item: any, monitor: any) => {
      const offset = monitor.getClientOffset();

      if (offset) {
        const dropElement = dropRefs.current.find(
          (ref) =>
            ref &&
            ref.getBoundingClientRect().bottom > offset.y &&
            ref.getBoundingClientRect().top < offset.y
        );

        if (dropElement) {
          const index = dropRefs.current.indexOf(dropElement);

          if (index !== -1) {
            const newItems = headerItems.items.map(
              (itemItem: any, itemIndex: number) => {
                if (itemIndex === index) {
                  return { ...itemItem, key: item.key }; // Update the key in items
                }
                return itemItem;
              }
            );

            const newLayout = headerItems.layout.map(
              (layoutItem: any, layIndex: number) => {
                if (layIndex === index) {
                  return { ...layoutItem, i: item.key };
                }
                return layoutItem;
              }
            );

            setHeaderItems({
              ...headerItems,
              layout: newLayout,
              items: newItems,
            });
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop}>
      {/* <GridLayout
        className="layout mt-8"
        layout={headerItems.layout}
        cols={12}
        rowHeight={20}
        width={1024}
        compactType="vertical"
        // preventCollision={true}
        // useCSSTransforms={true}
        allowOverlap={false}
      > */}
        {headerItems?.items?.map((headerItem: any, index: any) => (
          <div
            key={headerItem}
            ref={(node: any) => (dropRefs.current[index] = node)} // Assign ref to each item
          >
            {headerItem.key}
          </div>
        ))}
      {/* </GridLayout> */}
    </div>
  );
};

export default DragCompo;
