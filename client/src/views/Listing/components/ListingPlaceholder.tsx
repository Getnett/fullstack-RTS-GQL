import { Alert, Divider, Skeleton } from "antd";
interface Props {
    title: string;
    error?: string;
}
export function ListingPlaceholder({ title, error }: Props) {
    const errorMessage = error ? <Alert type='error' message={error} /> : null;

    return (
        <div style={{ paddingTop: "2rem" }}>
            {errorMessage}
            <h3
                style={{
                    textAlign: "center",
                    fontSize: "1.8rem",
                    marginTop: "2rem",
                }}
            >
                {title}
            </h3>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Divider />
        </div>
    );
}
