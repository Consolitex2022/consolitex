import { FC } from "react"
import ContentLoader from "react-content-loader"

const InmuebleCardNoGridPlaceholder: FC = (props: any) => (
    <ContentLoader
        speed={2}
        width={400}
        height={150}
        viewBox="0 0 400 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="32" y="23" rx="0" ry="0" width="135" height="126" />
        <rect x="103" y="105" rx="0" ry="0" width="0" height="1" />
        <rect x="184" y="25" rx="0" ry="0" width="314" height="15" />
        <rect x="184" y="58" rx="0" ry="0" width="222" height="14" />
        <rect x="184" y="78" rx="0" ry="0" width="231" height="15" />
        <rect x="349" y="128" rx="0" ry="0" width="51" height="22" />
        <rect x="294" y="128" rx="0" ry="0" width="49" height="21" />
    </ContentLoader>
)

export default InmuebleCardNoGridPlaceholder