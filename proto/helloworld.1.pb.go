// Code generated by protoc-gen-go. DO NOT EDIT.
// source: helloworld.1.proto

package proto

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

// The request message containing the user's name.
type PoopRequest struct {
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *PoopRequest) Reset()         { *m = PoopRequest{} }
func (m *PoopRequest) String() string { return proto.CompactTextString(m) }
func (*PoopRequest) ProtoMessage()    {}
func (*PoopRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_57a0dd33e3051885, []int{0}
}

func (m *PoopRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_PoopRequest.Unmarshal(m, b)
}
func (m *PoopRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_PoopRequest.Marshal(b, m, deterministic)
}
func (m *PoopRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_PoopRequest.Merge(m, src)
}
func (m *PoopRequest) XXX_Size() int {
	return xxx_messageInfo_PoopRequest.Size(m)
}
func (m *PoopRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_PoopRequest.DiscardUnknown(m)
}

var xxx_messageInfo_PoopRequest proto.InternalMessageInfo

func (m *PoopRequest) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

// The response message containing the greetings
type PoopReply struct {
	Message              string   `protobuf:"bytes,1,opt,name=message,proto3" json:"message,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *PoopReply) Reset()         { *m = PoopReply{} }
func (m *PoopReply) String() string { return proto.CompactTextString(m) }
func (*PoopReply) ProtoMessage()    {}
func (*PoopReply) Descriptor() ([]byte, []int) {
	return fileDescriptor_57a0dd33e3051885, []int{1}
}

func (m *PoopReply) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_PoopReply.Unmarshal(m, b)
}
func (m *PoopReply) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_PoopReply.Marshal(b, m, deterministic)
}
func (m *PoopReply) XXX_Merge(src proto.Message) {
	xxx_messageInfo_PoopReply.Merge(m, src)
}
func (m *PoopReply) XXX_Size() int {
	return xxx_messageInfo_PoopReply.Size(m)
}
func (m *PoopReply) XXX_DiscardUnknown() {
	xxx_messageInfo_PoopReply.DiscardUnknown(m)
}

var xxx_messageInfo_PoopReply proto.InternalMessageInfo

func (m *PoopReply) GetMessage() string {
	if m != nil {
		return m.Message
	}
	return ""
}

func init() {
	proto.RegisterType((*PoopRequest)(nil), "proto.PoopRequest")
	proto.RegisterType((*PoopReply)(nil), "proto.PoopReply")
}

func init() { proto.RegisterFile("helloworld.1.proto", fileDescriptor_57a0dd33e3051885) }

var fileDescriptor_57a0dd33e3051885 = []byte{
	// 191 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0xca, 0x48, 0xcd, 0xc9,
	0xc9, 0x2f, 0xcf, 0x2f, 0xca, 0x49, 0xd1, 0x33, 0xd4, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62,
	0x05, 0x53, 0x52, 0x32, 0xe9, 0xf9, 0xf9, 0xe9, 0x39, 0xa9, 0xfa, 0x89, 0x05, 0x99, 0xfa, 0x89,
	0x79, 0x79, 0xf9, 0x25, 0x89, 0x25, 0x99, 0xf9, 0x79, 0xc5, 0x10, 0x45, 0x4a, 0x8a, 0x5c, 0xdc,
	0x01, 0xf9, 0xf9, 0x05, 0x41, 0xa9, 0x85, 0xa5, 0xa9, 0xc5, 0x25, 0x42, 0x42, 0x5c, 0x2c, 0x79,
	0x89, 0xb9, 0xa9, 0x12, 0x8c, 0x0a, 0x8c, 0x1a, 0x9c, 0x41, 0x60, 0xb6, 0x92, 0x2a, 0x17, 0x27,
	0x44, 0x49, 0x41, 0x4e, 0xa5, 0x90, 0x04, 0x17, 0x7b, 0x6e, 0x6a, 0x71, 0x71, 0x62, 0x3a, 0x4c,
	0x0d, 0x8c, 0x6b, 0x14, 0xc2, 0xc5, 0x02, 0x52, 0x26, 0xe4, 0xc3, 0xc5, 0x1e, 0x9c, 0x58, 0x09,
	0x66, 0x0a, 0x41, 0x2c, 0xd1, 0x43, 0xb2, 0x41, 0x4a, 0x00, 0x45, 0xac, 0x20, 0xa7, 0x52, 0x49,
	0xba, 0xe9, 0xf2, 0x93, 0xc9, 0x4c, 0xa2, 0x4a, 0x02, 0xfa, 0x65, 0x86, 0xfa, 0xa9, 0x15, 0x89,
	0xb9, 0x05, 0x39, 0xa9, 0xfa, 0x05, 0xf9, 0xf9, 0x05, 0x56, 0x8c, 0x5a, 0x49, 0x6c, 0x60, 0xd5,
	0xc6, 0x80, 0x00, 0x00, 0x00, 0xff, 0xff, 0x16, 0xc3, 0x79, 0x11, 0xe1, 0x00, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// PoopClient is the client API for Poop service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type PoopClient interface {
	// Sends a greeting
	SayPoop(ctx context.Context, in *PoopRequest, opts ...grpc.CallOption) (*PoopReply, error)
}

type poopClient struct {
	cc *grpc.ClientConn
}

func NewPoopClient(cc *grpc.ClientConn) PoopClient {
	return &poopClient{cc}
}

func (c *poopClient) SayPoop(ctx context.Context, in *PoopRequest, opts ...grpc.CallOption) (*PoopReply, error) {
	out := new(PoopReply)
	err := c.cc.Invoke(ctx, "/proto.Poop/SayPoop", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PoopServer is the server API for Poop service.
type PoopServer interface {
	// Sends a greeting
	SayPoop(context.Context, *PoopRequest) (*PoopReply, error)
}

// UnimplementedPoopServer can be embedded to have forward compatible implementations.
type UnimplementedPoopServer struct {
}

func (*UnimplementedPoopServer) SayPoop(ctx context.Context, req *PoopRequest) (*PoopReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SayPoop not implemented")
}

func RegisterPoopServer(s *grpc.Server, srv PoopServer) {
	s.RegisterService(&_Poop_serviceDesc, srv)
}

func _Poop_SayPoop_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PoopRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PoopServer).SayPoop(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.Poop/SayPoop",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PoopServer).SayPoop(ctx, req.(*PoopRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Poop_serviceDesc = grpc.ServiceDesc{
	ServiceName: "proto.Poop",
	HandlerType: (*PoopServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SayPoop",
			Handler:    _Poop_SayPoop_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "helloworld.1.proto",
}
