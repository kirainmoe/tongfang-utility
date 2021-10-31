import { Modal } from "@arco-design/web-react";

export const openInfoModal = (title: string, content: string) => {
  Modal.info({
    title: title,
    content: (
      <div dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    ),
  });
};