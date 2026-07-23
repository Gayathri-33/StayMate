package com.staymate.service;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final HostelRepository hostelRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final ResidentRepository residentRepository;
    private final ComplaintRepository complaintRepository;
    private final PaymentRepository paymentRepository;
    private final NoticeRepository noticeRepository;
    private final MessMenuRepository messMenuRepository;
    private final NotificationRepository notificationRepository;
    private final FileStorageService fileStorageService;

    public AdminService(UserRepository userRepository, HostelRepository hostelRepository,
                         RoomRepository roomRepository, BedRepository bedRepository,
                         ResidentRepository residentRepository, ComplaintRepository complaintRepository,
                         PaymentRepository paymentRepository, NoticeRepository noticeRepository,
                         MessMenuRepository messMenuRepository, NotificationRepository notificationRepository,
                         FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.hostelRepository = hostelRepository;
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
        this.residentRepository = residentRepository;
        this.complaintRepository = complaintRepository;
        this.paymentRepository = paymentRepository;
        this.noticeRepository = noticeRepository;
        this.messMenuRepository = messMenuRepository;
        this.notificationRepository = notificationRepository;
        this.fileStorageService = fileStorageService;
    }

    // ---------- HOSTEL REGISTRATION ----------

    public Hostel registerHostel(Long adminUserId, HostelRegisterRequest req, MultipartFile qrFile) {
        User admin = userRepository.findById(adminUserId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Hostel hostel = new Hostel();
        hostel.setHostelName(req.getHostelName());
        hostel.setPlace(req.getPlace());
        hostel.setHostelType(HostelType.valueOf(req.getHostelType()));
        hostel.setTotalRooms(req.getTotalRooms());
        hostel.setFeeAmount(req.getFeeAmount());
        hostel.setFeeCycle(FeeCycle.valueOf(req.getFeeCycle()));
        hostel.setPaymentBufferDays(req.getPaymentBufferDays());
        hostel.setStatus(HostelStatus.PENDING);
        hostel.setAdmin(admin);
        hostel.setBlockName(req.getBlockName());  // Add this line
        if (qrFile != null && !qrFile.isEmpty()) {
            hostel.setQrImagePath(fileStorageService.store(qrFile));
        }

        hostel = hostelRepository.save(hostel);

        Notification notif = new Notification();
        notif.setRecipientRole(Role.SUPER_ADMIN);
        notif.setMessage("New hostel registration: \"" + hostel.getHostelName() + "\" by " + admin.getFullName());
        notificationRepository.save(notif);

        return hostel;
    }

    public List<HostelSummaryDTO> getMyHostels(Long adminUserId) {
        return hostelRepository.findByAdmin_UserId(adminUserId).stream()
                .map(this::toHostelSummary)
                .toList();
    }

    private HostelSummaryDTO toHostelSummary(Hostel h) {
        return new HostelSummaryDTO(
                h.getHostelId(), h.getHostelCode(), h.getHostelName(), h.getPlace(),
                h.getHostelType() != null ? h.getHostelType().name() : null,
                h.getTotalRooms(), h.getStatus().name(), h.getFeeAmount(),
                h.getFeeCycle() != null ? h.getFeeCycle().name() : null,
                h.getAdmin() != null ? h.getAdmin().getFullName() : null,
                h.getAdmin() != null ? h.getAdmin().getEmail() : null
        );
    }

    // ---------- DASHBOARD ----------

    public AdminDashboardDTO getDashboard(Long adminUserId) {
        List<Hostel> hostels = hostelRepository.findByAdmin_UserId(adminUserId);

        long totalResidents = 0, totalRooms = 0, occupiedBeds = 0, availableBeds = 0;
        long pendingComplaints = 0, resolvedComplaints = 0;
        double feesCollected = 0;

        for (Hostel h : hostels) {
            List<Room> rooms = roomRepository.findByHostel_HostelId(h.getHostelId());
            totalRooms += rooms.size();
            for (Room r : rooms) {
                occupiedBeds += r.getOccupiedBeds();
                availableBeds += r.getAvailableBeds();
            }
            totalResidents += residentRepository.findByHostel_HostelId(h.getHostelId()).size();
            pendingComplaints += complaintRepository
                    .findByResident_Hostel_HostelIdAndStatus(h.getHostelId(), ComplaintStatus.PENDING).size();
            resolvedComplaints += complaintRepository
                    .findByResident_Hostel_HostelIdAndStatus(h.getHostelId(), ComplaintStatus.RESOLVED).size();

            for (Resident res : residentRepository.findByHostel_HostelId(h.getHostelId())) {
                feesCollected += paymentRepository.findByResident_ResidentId(res.getResidentId()).stream()
                        .filter(p -> p.getStatus() == PaymentStatus.PAID)
                        .mapToDouble(Payment::getAmount)
                        .sum();
            }
        }

        List<HostelSummaryDTO> hostelDTOs = hostels.stream().map(this::toHostelSummary).toList();

        return new AdminDashboardDTO(
                hostels.size(),
                hostels.size() > 1 ? hostelDTOs : null,
                hostels.size() == 1 ? hostelDTOs.get(0) : null,
                totalResidents, totalRooms, occupiedBeds, availableBeds,
                pendingComplaints, resolvedComplaints, feesCollected
        );
    }

    // ---------- ROOMS ----------

    public List<RoomDTO> getRooms(String hostelCode) {
        return roomRepository.findByHostel_HostelCode(hostelCode).stream()
                .map(r -> new RoomDTO(r.getRoomId(), r.getRoomNumber(), r.getCapacity(),
                        r.getOccupiedBeds(), r.getAvailableBeds(), hostelCode))
                .toList();
    }

    public RoomDTO getRoom(Long roomId) {
        Room r = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        return new RoomDTO(r.getRoomId(), r.getRoomNumber(), r.getCapacity(),
                r.getOccupiedBeds(), r.getAvailableBeds(), r.getHostel().getHostelCode());
    }

    public Room addRoom(String hostelCode, RoomDTO dto) {
        Hostel hostel = hostelRepository.findByHostelCode(hostelCode)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        Room room = new Room();
        room.setRoomNumber(dto.getRoomNumber());
        room.setCapacity(dto.getCapacity());
        room.setOccupiedBeds(0);
        room.setAvailableBeds(dto.getCapacity());
        room.setHostel(hostel);
        room = roomRepository.save(room);

        // auto-generate beds matching capacity
        for (int i = 1; i <= dto.getCapacity(); i++) {
            Bed bed = new Bed();
            bed.setBedNumber(room.getRoomNumber() + "-B" + i);
            bed.setStatus(BedStatus.VACANT);
            bed.setRoom(room);
            bedRepository.save(bed);
        }

        return room;
    }

    public Room updateRoom(Long roomId, RoomDTO dto) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setRoomNumber(dto.getRoomNumber());
        // capacity changes intentionally NOT auto-adjusting bed count here —
        // that needs manual bed add/remove to avoid orphaning occupied beds
        room.setCapacity(dto.getCapacity());
        return roomRepository.save(room);
    }

    public void deleteRoom(Long roomId) {
        bedRepository.findByRoom_RoomId(roomId).forEach(bedRepository::delete);
        roomRepository.deleteById(roomId);
    }

    // ---------- BEDS ----------

    public List<BedDTO> getBeds(Long roomId) {
        return bedRepository.findByRoom_RoomId(roomId).stream()
                .map(b -> new BedDTO(
                        b.getBedId(), b.getBedNumber(), b.getStatus().name(),
                        b.getRoom().getRoomId(), b.getRoom().getRoomNumber(),
                        b.getResident() != null ? b.getResident().getUser().getFullName() : null,
                        b.getResident() != null ? b.getResident().getResidentCode() : null
                ))
                .toList();
    }

    public List<BedDTO> getAllBedsForHostel(String hostelCode) {
        return roomRepository.findByHostel_HostelCode(hostelCode).stream()
                .flatMap(r -> bedRepository.findByRoom_RoomId(r.getRoomId()).stream())
                .map(b -> new BedDTO(
                        b.getBedId(), b.getBedNumber(), b.getStatus().name(),
                        b.getRoom().getRoomId(), b.getRoom().getRoomNumber(),
                        b.getResident() != null ? b.getResident().getUser().getFullName() : null,
                        b.getResident() != null ? b.getResident().getResidentCode() : null
                ))
                .toList();
    }

    public Bed addBed(Long roomId, String bedNumber) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));

        Bed bed = new Bed();
        bed.setBedNumber(bedNumber);
        bed.setStatus(BedStatus.VACANT);
        bed.setRoom(room);
        bed = bedRepository.save(bed);

        room.setCapacity(room.getCapacity() + 1);
        room.setAvailableBeds(room.getAvailableBeds() + 1);
        roomRepository.save(room);

        return bed;
    }

    public void deleteBed(Long bedId) {
        Bed bed = bedRepository.findById(bedId).orElseThrow(() -> new RuntimeException("Bed not found"));

        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new RuntimeException("Cannot delete an occupied bed. Vacate it first.");
        }

        Room room = bed.getRoom();
        room.setCapacity(room.getCapacity() - 1);
        room.setAvailableBeds(room.getAvailableBeds() - 1);
        roomRepository.save(room);

        bedRepository.delete(bed);
    }

    // ---------- NOTICES ----------

    public List<NoticeDTO> getNotices(Long hostelId) {
        return noticeRepository.findByHostel_HostelIdOrderByCreatedAtDesc(hostelId).stream()
                .map(n -> new NoticeDTO(n.getNoticeId(), n.getTitle(), n.getDescription(),
                        n.getDeadline(), n.getCreatedAt()))
                .toList();
    }

    public Notice addNotice(Long hostelId, NoticeRequest req) {
        Hostel hostel = hostelRepository.findById(hostelId).orElseThrow(() -> new RuntimeException("Hostel not found"));

        Notice notice = new Notice();
        notice.setHostel(hostel);
        notice.setTitle(req.getTitle());
        notice.setDescription(req.getDescription());
        notice.setDeadline(req.getDeadline());
        return noticeRepository.save(notice);
    }

    public void deleteNotice(Long noticeId) {
        noticeRepository.deleteById(noticeId);
    }

    // ---------- MESS MENU ----------

    public List<MessMenuDTO> getMessMenu(Long hostelId) {
        return messMenuRepository.findByHostel_HostelId(hostelId).stream()
                .map(m -> new MessMenuDTO(m.getId(), m.getDayOfWeek(), m.getMealType().name(),
                        m.getDishName(), m.getTiming()))
                .toList();
    }

    public MessMenu addMessItem(Long hostelId, MessMenuRequest req) {
        Hostel hostel = hostelRepository.findById(hostelId).orElseThrow(() -> new RuntimeException("Hostel not found"));

        MessMenu item = new MessMenu();
        item.setHostel(hostel);
        item.setDayOfWeek(req.getDayOfWeek());
        item.setMealType(MealType.valueOf(req.getMealType()));
        item.setDishName(req.getDishName());
        item.setTiming(req.getTiming());
        return messMenuRepository.save(item);
    }

    public void deleteMessItem(Long id) {
        messMenuRepository.deleteById(id);
    }
 // ---------- NOTIFICATIONS ----------

    public List<NotificationDTO> getNotifications(Long adminUserId) {
        return notificationRepository
                .findByRecipientRoleAndRecipientIdOrderByCreatedAtDesc(Role.ADMIN, adminUserId)
                .stream()
                .map(n -> new NotificationDTO(n.getId(), n.getMessage(), n.getIsRead(), n.getCreatedAt()))
                .toList();
    }

    public void markNotificationRead(Long id) {
        Notification n = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setIsRead(true);
        notificationRepository.save(n);
    }
}