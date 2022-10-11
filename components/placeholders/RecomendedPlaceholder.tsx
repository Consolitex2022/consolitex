import { FC } from "react"
import ContentLoader from "react-content-loader"


const RecomendedPlaceholder: FC = (props: any) => (
    <ContentLoader
        speed={2}
        width={400}
        height={150}
        viewBox="0 0 400 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="57" y="1" rx="0" ry="0" width="75" height="55" />
        <rect x="49" y="68" rx="0" ry="0" width="94" height="8" />
        <rect x="49" y="88" rx="0" ry="0" width="94" height="8" />
        <rect x="49" y="108" rx="0" ry="0" width="94" height="8" />
        <rect x="52" y="127" rx="0" ry="0" width="88" height="25" />
    </ContentLoader>
)

export default RecomendedPlaceholder;