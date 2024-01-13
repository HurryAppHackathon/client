import { h } from "preact"
import styles from '../../../styles/Application/index.module.scss';
import { ChatSidebar } from "./Chat";
export function ChatSection() {
	return (
		<div className={styles.chat_section}>
			<ChatSidebar />
		</div>
	)
}