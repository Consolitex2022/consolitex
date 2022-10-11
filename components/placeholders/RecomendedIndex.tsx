import { FC } from "react"
import ContentLoader from "react-content-loader"

const RecomendedIndexPlaceholder: FC = (props: any) => (
    <ContentLoader
        speed={2}
        width={400}
        height={150}
        viewBox="0 0 400 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="103" y="105" rx="0" ry="0" width="0" height="1" />
        <rect x="43" y="4" rx="0" ry="0" width="125" height="95" />
        <rect x="43" y="105" rx="0" ry="0" width="124" height="5" />
        <rect x="43" y="118" rx="0" ry="0" width="124" height="5" />
        <rect x="43" y="130" rx="0" ry="0" width="124" height="5" />
        <rect x="43" y="143" rx="0" ry="0" width="124" height="5" />
    </ContentLoader>
)

export default RecomendedIndexPlaceholder