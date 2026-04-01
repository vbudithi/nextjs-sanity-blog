import BlogDesktop from './BlogDesktop'
import BlogMobile from './BlogMobile'

export default function BlogWrapper(props: any) {
    return (
        <>
            <div className="hidden lg:block">
                <BlogDesktop {...props} />
            </div>
            <div className="block lg:hidden">
                <BlogMobile {...props} />
            </div>
        </>
    )
}