import { useMemo } from "react";
import { EmailEditorProvider, EmailTemplate } from "easy-email-pro-editor";
import { Retro } from "easy-email-pro-theme";
import { EditorHeader } from "./components/EditorHeader";
import { useUpload } from "./hooks/useUpload";
import { Layout, Select, Space } from "@arco-design/web-react";
import React from "react";
import "easy-email-pro-theme/lib/style.css";
import "@arco-themes/react-easy-email-pro/css/arco.css";
import data from "./template.json";

import { useCompactMode } from "./hooks/useCompactMode";

export default function MyEditor() {
  const [theme, setTheme] = React.useState<string>("purple");
  const { upload } = useUpload();

  const initialValues: EmailTemplate | null = useMemo(() => {
    return {
      subject: data.subject,
      content: data.content as EmailTemplate["content"],
    };
  }, []);

  const onUpload = (file: Blob): Promise<string> => {
    return upload(file);
  };

  const onSubmit = async (values: EmailTemplate) => {
    console.log(values);
  };

  const compact = useCompactMode();
  const config = Retro.useCreateConfig({
    clientId: "your client ID",
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
    height: "calc(100vh - 66px)",
    showLayer: true,
    compact,
  });

  return (
    <EmailEditorProvider {...config}>
      <EditorHeader />

      <Layout.Content>
        <Retro.Layout></Retro.Layout>
      </Layout.Content>
    </EmailEditorProvider>
  );
}
