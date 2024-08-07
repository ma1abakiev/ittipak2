// article-viewer.ui.tsx
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultStyleSpecs,
} from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import { CodeBlock } from '@defensestation/blocknote-code'
import { AlertBlock } from '~features/blocknote/alert-block'
import { YouTubeBlock } from '~features/blocknote/youtube-block'
import { codeStyleSpec } from '~features/blocknote/code-toolbar'
import { commentStyleSpec } from '@defensestation/blocknote-comments'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'
import { BlockNoteView } from '@blocknote/mantine'
import { PDF } from '~features/blocknote/pdf-block' // Import the PDF block

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: AlertBlock,
    youtube: YouTubeBlock,
    procode: CodeBlock,
    pdf: PDF, // Add PDF block to the schema
  },
  styleSpecs: {
    ...defaultStyleSpecs,
    comment: commentStyleSpec,
    code: codeStyleSpec,
  },
})

type ArticleViewerProps = {
  body: any
}

export function ArticleViewer(props: ArticleViewerProps) {
  const editor = useCreateBlockNote({
    schema,
    initialContent: props.body,
  })

  return (
    <div className="blocknote-container">
      <BlockNoteView
        data-changing-font-demo
        slashMenu={false}
        editor={editor}
        theme={'light'}
        formattingToolbar={false}
        editable={false}
      />
    </div>
  )
}
